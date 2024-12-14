import { getPaste, getUrl } from "@/app/actions"

export async function GET(
    _: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug

    const res = await getUrl(slug)
    if (res && res.length > 0) {
        return new Response(JSON.stringify(res[0]), {
            status: 200,
        })
    }

    const paste_res = await getPaste(slug)
    if (paste_res) {
        const paste = paste_res[0]
        return new Response(JSON.stringify(paste), {
            status: 200,
        })
    }

    return new Response('URL not found', {
        status: 404
    })
}
