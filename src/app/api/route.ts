import { generateHash } from "@/lib/hash"
import { addPaste, addUrl } from "../actions"

export async function GET(
    _: Request,
) {
    return new Response('Noob API Written in pure JS since 2024', {
        status: 200,
    })
}

export async function POST(req: Request) {
    const data = await req.json()
    if (!data['type']) {
        return new Response('Missing type', {
            status: 400,
        })
    }
    const type = data['type']
    if (type === 'paste') {
        if (!data['filename'] || !data['content'] || !data['lang']) {
            return new Response('Missing filename, content or lang', {
                status: 400,
            })
        }
        const filename = data['filename']
        const content = data['content']
        const lang = data['lang']
        const res = await addPaste(filename, lang, content)
        return new Response(JSON.stringify(res), {
            status: 200,
        })
    }
    if (type === 'url') {
        if (!data['url']) {
            return new Response('Missing url', {
                status: 400,
            })
        }
        const url = data['url']
        let hash = data['hash']
        if (!hash) {
            hash = generateHash()
        }
        const res = await addUrl(url, hash)
        return new Response(JSON.stringify(res), {
            status: 200,
        })
    }

    return new Response('Invalid type', {
        status: 400,
    })
}
