'use client'

import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LANGS } from '@/lib/langs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { generateHash } from '@/lib/hash';

export default function CodeEditor({ filename = '', lang = "markdown", content = '', readOnly = false }) {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState(lang);
    const [value, setValue] = useState(content);
    const [fileName, setFileName] = useState(filename === '' ? generateHash(6) : filename);

    function handleEditorDidMount(editor, _) {
        editorRef.current = editor;
        editorRef.current.setValue(value);
        editorRef.current.focus();
    }

    return (
        <div>
            <div className='flex flex-row'>
                <Input name="fileName" className='w-2/5 border-gray-600 p-2 m-2 border-2 focus-visible:ring-0' value={fileName} onChange={(e) => setFileName(e.target.value)} readOnly={readOnly} />
                <textarea name="content" hidden value={value} className='hidden' readOnly />
                <Select onValueChange={setLanguage} defaultValue={lang}>
                    <SelectTrigger name='lang' disabled={readOnly}
                        className="w-2/5 p-2 m-2 border-2 border-gray-600 focus-visible:ring-0">
                        <SelectValue placeholder="Select a Language" />
                    </SelectTrigger>
                    <SelectContent>
                        {LANGS.map((lang) =>
                        (
                            <SelectItem
                                key={lang}
                                value={lang}
                            >
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </SelectItem>
                        )
                        )}
                    </SelectContent>
                </Select>
                <Button className='p-2 m-2 w-1/5' onClick={() => console.log(value)}>Save</Button>
            </div>
            <Editor
                height="60vh"
                language={language}
                value={value}
                options={{
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    fontSize: 16,
                    fontFamily: 'Geist Mono',
                    readOnly: readOnly,
                }}
                onMount={handleEditorDidMount}
                onChange={() => setValue(editorRef.current.getValue())}
            />
        </div>
    );
}
