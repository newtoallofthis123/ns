import { getUrl } from "@/app/actions"

export async function GET(
    _: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug

    const res = await getUrl(slug)
    if (res) {
        return new Response(res[0].url, {
            status: 301,
            headers: {
                Location: res[0].url
            }
        })
    } else {
        return new Response("URL not found", {
            status: 404
        })
    }
}
