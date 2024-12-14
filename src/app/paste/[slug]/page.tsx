import { getPaste } from "@/app/actions";
import CodeEditor from "@/components/custom/editor";
import NavBar from "@/components/custom/nav";

export default async function Paste({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const pastes = await getPaste(slug);
    if (!pastes) {
        return new Response("Paste not found", {
            status: 404,
        });
    }
    const paste = pastes[0];
    return (
        <div>
            <NavBar />
            <div className='flex flex-row justify-center items-center md:mt-10 mt-2'>
                <div className='w-2/3 border-2 border-black rounded-md'>
                    <CodeEditor filename={paste['filename']} lang={paste['lang']} content={paste['content']} readOnly={true} />
                    <div className='bg-black px-2 py-1 text-white'>
                        <p>
                            Created at: {(paste['created_at'] as Date).toLocaleString() + " UTC"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
