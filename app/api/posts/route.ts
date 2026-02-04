import { getAllPosts } from '@/libs/cache';

export const dynamic = 'force-static';

export async function GET() {
    const posts = await getAllPosts();
    return Response.json({ posts }, { headers: { 'Cache-Control': 's-maxage=31536000, stale-while-revalidate' } });
}