import { useRef } from 'react';

import { extractColors } from 'extract-colors';

import localFilesAPI from '../../../../utils/api/localFilesAPI';
import * as St from '../styles';
import { MdImageSearch } from "react-icons/md";

const UploadImage = ({ question, questionIdx, setQuestions, setImageUrls, imageUrls, error }) => {
    const inputRef = useRef(null);

    const uploadImage = async (files, questionIdx) => {
        try {
            const file = files[0];
            const res = await localFilesAPI.uploadQuestionFile(file);
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;

                extractColors(imageUrl)
                    .then((colors) => {
                        setQuestions((prev) => {
                            let copy = [...prev];
                            copy[questionIdx].colors = colors.map((color) => color.hex).join();
                            copy[questionIdx].questionImage = res.data.data[0].id;
                            return copy;
                        });
                    })
                    .catch(console.error);
                setImageUrls((prev) => {
                    let copy = [...prev];
                    copy[questionIdx] = imageUrl;
                    return copy;
                });
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const removeImage = (questionIdx) => {
        setQuestions((prev) => {
            let copy = [...prev];
            copy[questionIdx].colors = '';
            copy[questionIdx].questionImage = '';
            return copy;
        });
        setImageUrls((prev) => {
            let copy = [...prev];
            copy[questionIdx] = '';
            return copy;
        });
    };

    return (
        <div>
            <label id='question-type3'>Image</label>
            <input
                id="questionImage"
                type="file"
                hidden
                ref={inputRef}
                onChange={(e) => uploadImage(e.target.files, questionIdx)}
            />
            {question.questionImage ? (
                <div className="position-relative" style={{ width: '300px' }}>
                    <St.PreviewImage src={imageUrls[questionIdx]} alt="Image" />
                    <button
                        className="position-absolute top-0 start-100 translate-middle rounded-circle bg-danger text-white py-2 px-3"
                        onClick={() => removeImage(questionIdx)}
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
