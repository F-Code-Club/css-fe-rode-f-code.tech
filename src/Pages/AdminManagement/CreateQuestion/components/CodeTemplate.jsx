import * as St from '../styles';
import { addCodeTemplate } from './utils';

const CodeTemplate = ({ questionIdx, setQuestions, error, isBackend = false }) => {
    const placeholder = isBackend
        ? `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`
        : `<div></div>\n<style>\n    div {\n\twidth: 100px;\n\theight: 100px;\n\tbackground: #dd6b4d;\n    }\n</style>`;

    return (
        <St.CodeTemplate>
            <label htmlFor="codeTemplate" className='question-type3'>Code Template</label>
            <div>
                <textarea
                    name="codeTemplate"
                    id="codeTemplate"
                    cols="40"
                    rows="80"
                    onChange={(e) => addCodeTemplate(e.target.value, questionIdx, setQuestions)}
                    placeholder={placeholder}
                    style={isBackend ? { height: '250px' } : {}}
                />
            </div>
            <h6 className="text-danger">{error}</h6>
        </St.CodeTemplate>
    );
};

export default CodeTemplate;
