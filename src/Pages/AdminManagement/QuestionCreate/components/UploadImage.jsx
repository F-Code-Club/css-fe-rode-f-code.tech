import { useRef, useState } from 'react';
import { extractColors } from 'extract-colors';
import * as St from '../styles';
import { MdImageSearch } from "react-icons/md";

const UploadImage = ({ type, question, questionIdx, setQuestions, error }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const handleImageChange = (files) => {
        try {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = async(event) => {
                const imageUrl = event.target.result;
                try {
                    if(type == 'FE'){
                        const colors = await extractColors(imageUrl);
                        setQuestions((prevQuestions) => {
                            const updatedQuestions = [...prevQuestions];
                            updatedQuestions[questionIdx].colors = colors.map((color) => color.hex).join(',');
                            updatedQuestions[questionIdx].questionImage = file;
                            return updatedQuestions;
                        });
                    }else if (type =='BE'){
                        setQuestions((prevQuestions) => {
                            const updatedQuestions = [...prevQuestions];
                            updatedQuestions[questionIdx].questionImage = file;
                            return updatedQuestions;
                        });
                    }
                    setPreviewUrl(imageUrl);
                } catch (error) {
                    console.error('Error', error);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const removeImage = () => {
        if (type == 'FE'){
            setQuestions((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[questionIdx].colors = '';
                updatedQuestions[questionIdx].questionImage = ''; 
                return updatedQuestions;
            });
        }else if (type == 'BE'){
            setQuestions((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[questionIdx].questionImage = ''; 
                return updatedQuestions;
            });
        }
        setPreviewUrl(null);
    };

    return (
        <div>
            <label id='question-type3'>Image</label>
            <input
                id="questionImage"
                type="file"
                hidden
                ref={inputRef}
                onChange={(e) => handleImageChange(e.target.files)}
            />
            {question.questionImage ? (
                <div className="position-relative" style={{ width: '300px' }}>
                    <St.PreviewImage src={previewUrl} alt="Image" />
                    <button
                        className="position-absolute top-0 start-100 translate-middle rounded-circle bg-danger text-white py-2 px-3"
                        onClick={removeImage}
                    >
                        x
                    </button>
                </div>
            ) : (
                <St.UploadImage id='img-upload' onClick={() => inputRef.current.click()}>
                    <MdImageSearch id='img-icon'/>
                    <span id='question-type4'>Upload your image here...</span>
                </St.UploadImage>
            )}
            <h6 className="text-danger">{error}</h6>
        </div>
    );
};

export default UploadImage;
