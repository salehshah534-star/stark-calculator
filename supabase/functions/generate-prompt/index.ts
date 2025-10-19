import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Load all 10 API keys
const API_KEYS = [
  Deno.env.get('LONGCAT_API_KEY_1'),
  Deno.env.get('LONGCAT_API_KEY_2'),
  Deno.env.get('LONGCAT_API_KEY_3'),
  Deno.env.get('LONGCAT_API_KEY_4'),
  Deno.env.get('LONGCAT_API_KEY_5'),
  Deno.env.get('LONGCAT_API_KEY_6'),
  Deno.env.get('LONGCAT_API_KEY_7'),
  Deno.env.get('LONGCAT_API_KEY_8'),
  Deno.env.get('LONGCAT_API_KEY_9'),
  Deno.env.get('LONGCAT_API_KEY_10'),
].filter(Boolean) as string[];

let currentKeyIndex = 0;

console.log(`Loaded ${API_KEYS.length} API keys`);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('generate-prompt function called');
    
    // Check if API keys are available
    if (API_KEYS.length === 0) {
      console.error('No LONGCAT API keys configured!');
      return new Response(
        JSON.stringify({ success: false, error: 'No API keys configured. Please add LONGCAT_API_KEY_1 in secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { 
      fullContext, 
      referenceStyle, 
      characters, 
      lockedCharacters, 
      sceneLine,
      promptLength = 'balanced'
    } = await req.json();

    console.log('Request received:', { promptLength, sceneLine: sceneLine ? sceneLine.substring(0, 50) : 'undefined' });

    if (!sceneLine) {
      return new Response(
        JSON.stringify({ success: false, error: 'Scene line is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let retryCount = 0;
    const maxRetries = 10;
    
    while (retryCount < maxRetries) {
      try {
        const systemPrompt = buildSystemPrompt(
          fullContext, 
          referenceStyle, 
          characters, 
          lockedCharacters,
          promptLength
        );
        
        console.log(`Attempting with API Key ${currentKeyIndex + 1}`);
        
        const response = await fetch('https://api.longcat.chat/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEYS[currentKeyIndex]}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'LongCat-Flash-Chat',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: sceneLine }
            ],
            max_tokens: 1500,
            temperature: 0.7,
            stream: false
          })
        });

        // Handle quota exhaustion
        if (response.status === 429) {
          console.log(`API Key ${currentKeyIndex + 1} quota exhausted, rotating...`);
          currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          continue;
        }

        // Handle invalid key
        if (response.status === 401 || response.status === 403) {
          console.error(`API Key ${currentKeyIndex + 1} is invalid`);
          currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
          retryCount++;
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const generatedPrompt = data.choices[0].message.content.trim();

        console.log(`Success with API Key ${currentKeyIndex + 1}`);

        return new Response(
          JSON.stringify({ 
            success: true, 
            prompt: generatedPrompt,
            apiKeyUsed: currentKeyIndex + 1,
            tokensUsed: data.usage?.total_tokens || 0
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } catch (error) {
        console.error(`Error with API Key ${currentKeyIndex + 1}:`, error);
        retryCount++;
        currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        
        if (retryCount >= maxRetries) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'All API keys exhausted. Please try again later.' 
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // If we get here, all retries failed
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'All API keys exhausted after retries. Please try again later.' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Request processing error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildSystemPrompt(
  fullContext: string, 
  referenceStyle: string, 
  characters: any[], 
  lockedCharacters: string[],
  promptLength: string
): string {
  const lengthRequirements: Record<string, string> = {
    quick: '15-25 words',
    balanced: '25-50 words',
    detailed: '50-75 words',
    extended: '75-100 words',
    comprehensive: '100-150 words'
  };
  
  const wordCount = lengthRequirements[promptLength] || '25-50 words';
  const lockedChars = characters.filter((c: any) => lockedCharacters.includes(c.name));
  
  return `You are an expert image prompt generator for video storytelling. Generate precise, detailed ${wordCount} image prompts for AI image generation.

═══════════════════════════════════════════════════════════════════
📖 FULL STORY CONTEXT - READ AND UNDERSTAND COMPLETELY:
═══════════════════════════════════════════════════════════════════

${fullContext || 'No context provided'}

ANALYSIS REQUIREMENTS:
- Understand complete narrative arc, themes, mood
- Identify all character relationships and dynamics
- Recognize story genre and visual style requirements
- Track character presence and movements throughout story
- Understand emotional beats and tone shifts

═══════════════════════════════════════════════════════════════════
👥 HUMAN CHARACTERS DATABASE:
═══════════════════════════════════════════════════════════════════

${characters.map((char: any) => `
CHARACTER: ${char.name}
${char.aliases ? `ALIASES: ${char.aliases}` : ''}
DESCRIPTION: ${char.appearance}
${lockedCharacters.includes(char.name) ? '🔒 LOCKED (Must appear in EVERY prompt)' : ''}
`).join('\n')}

═══════════════════════════════════════════════════════════════════
🎨 LOCKED REFERENCE STYLE (ALWAYS FIRST):
═══════════════════════════════════════════════════════════════════

${referenceStyle || 'Semi-realistic animation style'}

This style phrase MUST be the first element of every prompt. Never skip or modify.

═══════════════════════════════════════════════════════════════════
⚠️ CRITICAL CHARACTER DETECTION RULES:
═══════════════════════════════════════════════════════════════════

1. EXPLICIT NAME DETECTION:
   - When character NAME appears in scene → Include full description
   - Match case-insensitively and check aliases

2. PRONOUN RESOLUTION (CRITICAL):
   - When pronouns appear (he/she/they/him/her/his/hers):
     * Look at FULL SCRIPT CONTEXT
     * Identify which character pronoun refers to
     * Consider: gender, previous scenes, story flow
     * Include that character with full description

3. POSSESSIVE REFERENCES:
   - "Michael's phone" → Include Michael
   - "Rachel's letter" → Include Rachel

4. LOCKED CHARACTERS:
${lockedChars.length > 0 ? `   MUST appear in EVERY prompt: ${lockedChars.map((c: any) => c.name).join(', ')}` : '   None'}

5. CHARACTER FORMAT:
   [Name], [age], [physical details], [clothing], [features]

═══════════════════════════════════════════════════════════════════
💬 DIALOGUE & TEXT HANDLING (CRITICAL):
═══════════════════════════════════════════════════════════════════

If scene contains dialogue, text messages, signs, letters, or readable text:

❌ DO NOT include actual text content
❌ DO NOT write "Text reads..." or "Says 'I love you'"

✅ INSTEAD describe ACT of communication:
- "Rachel says 'I love you'" → "Rachel speaks with deep emotion and vulnerability"
- "Phone shows 'Where are you?'" → "Close-up of phone screen displaying urgent message"

═══════════════════════════════════════════════════════════════════
📝 PROMPT STRUCTURE (EXACT ORDER):
═══════════════════════════════════════════════════════════════════

1. Locked reference style phrase
2. Character names + full descriptions (detected/locked)
3. Primary action/scene focus
4. Environment and background
5. Lighting, camera angle, framing
6. Mood, atmosphere, emotion

═══════════════════════════════════════════════════════════════════
📊 OUTPUT REQUIREMENTS:
═══════════════════════════════════════════════════════════════════

- Word count: ${wordCount} EXACTLY
- Format: Plain text only
- NO markdown (no **, *, #)
- NO word count annotation
- NO quotation marks
- NO line breaks
- Clear, visual, cinematic language

NOW GENERATE IMAGE PROMPT FOR THIS SCENE:`;
}
