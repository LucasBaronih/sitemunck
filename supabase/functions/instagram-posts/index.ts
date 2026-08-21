import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

/**
 * Edge function that fetches recent posts from the UltraMunck Instagram account
 * using the Instagram Graph API.
 *
 * Required secrets (configured via Supabase):
 *   INSTAGRAM_ACCESS_TOKEN — long-lived access token for the Instagram account
 *   INSTAGRAM_USER_ID — Instagram Business/Creator account ID
 *
 * If secrets are not configured, returns an empty array so the UI can
 * gracefully show a placeholder grid.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
    const userId = Deno.env.get("INSTAGRAM_USER_ID");

    if (!token || !userId) {
      return new Response(
        JSON.stringify({ posts: [], configured: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const limit = "9";
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

    const resp = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Instagram API error:", resp.status, errText);
      return new Response(
        JSON.stringify({ posts: [], configured: true, error: "instagram_api_error" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await resp.json();
    const posts: InstagramMedia[] = (data.data ?? []).slice(0, 9).map((p: InstagramMedia) => ({
      id: p.id,
      media_type: p.media_type,
      media_url: p.media_url,
      thumbnail_url: p.thumbnail_url,
      permalink: p.permalink,
      caption: p.caption?.slice(0, 200),
      timestamp: p.timestamp,
    }));

    return new Response(
      JSON.stringify({ posts, configured: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("instagram-posts function error:", err);
    return new Response(
      JSON.stringify({ posts: [], configured: false, error: "internal_error" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
