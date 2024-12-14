import { getPaste, getUrl } from "@/app/actions"

export async function GET(
    _: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug

    const res = await getUrl(slug)
    if (res && res.length > 0) {
        return new Response(res[0].url, {
            status: 301,
            headers: {
                Location: res[0].url
            }
        })
    }

    const paste_res = await getPaste(slug)
    if (paste_res) {
        const paste = paste_res[0]
        return new Response('/paste/' + paste['filename'], {
            status: 301,
            headers: {
                Location: '/paste/' + paste['filename']
            }
        })
    }

    return new Response('URL not found', {
        status: 404
    })
}
