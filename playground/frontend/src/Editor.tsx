import { Suspense, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import styles from './Editor.module.css';
import './userWorker';

import { RootState, useAppDispatch, useAppSelector } from './core';
import { decrement, increment } from './core/features/counter';
import { performCommonExecute } from './core/features/output/execute';
// import { performPrimaryAction } from './core/actions';

const Editor = () => {
    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);

    const code = useAppSelector((state: RootState) => state.output.execute.code);
    const count = useAppSelector((state: RootState) => state.counter.value);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (monacoEl) {
            setEditor((codeEditor) => {
                if (codeEditor) return codeEditor;

                const options = {
                    value: [
                        '// type your code here... ctrl+enter to run',
                        '//',
                        '// function x() {',
                        '//    console.log("Hello world!");',
                        '// }'
                    ].join('\n'),
                    language: 'typescript',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    theme: "vs-dark",
                };

                const editor = monaco.editor.create(monacoEl.current!, options);

                editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                    const code = editor.getValue();

                    dispatch(performCommonExecute(code));
                });

                return editor;
            });
        }

        return () => editor?.dispose();
    }, [monacoEl.current]);

    return (
        <Suspense fallback={'Loading'}>
            <div>
                <div>
                    <button onClick={() => dispatch(increment())}>+</button>
                    <span>{count}</span>
                    <button onClick={() => dispatch(decrement())}>-</button>
                </div>
                <div>
                    <code>{code}</code>
                </div>
            </div>
            <div className={styles.Editor} ref={monacoEl}></div>
        </Suspense>
    );
}

export default Editor;