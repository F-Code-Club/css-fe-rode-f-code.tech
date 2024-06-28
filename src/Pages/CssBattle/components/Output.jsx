import { useRef, useState, useEffect } from 'react';

import UnknownBG from '../../../assets/Unknown/UnknownBG.png';
import localFileApi from '../../../utils/api/localFileApi';
import DropdownType from '../../Home/components/DropdownType';
import { TypeV2 } from '../../Home/styled';
import { BoxOutput, Target, TextStyled, TextSmall } from '../styled';
import OutPutHeader from './OutPutHeader';

import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';

const Output = ({ code, data, currentQuestion }) => {
    const userOutPutRef = useRef();
    const imgRef = useRef();
    const outputContainerRef = useRef();
    const iframeRef = useRef();
    const [slideChecked, setSlideChecked] = useState(false);
    const [diffChecked, setDiffChecked] = useState(false);

    const changeSlideCheckBoxValue = () => {
        setSlideChecked((state) => !state);
    };
    const changeDiffCheckBoxValue = () => {
        setDiffChecked((state) => !state);
    };

    // const TestImg = localFileApi.getImg(data?.questions[currentQuestion]?.questionImage);
    const TestImg = data?.questions[currentQuestion]?.questionImage;
    function imageCompareSlider(e) {
        if (slideChecked) {
            let t = e.nativeEvent;
            let n = t.offsetX;
            userOutPutRef.current.style.width = (100 * n) / 400 + '%';
            userOutPutRef.current.style['box-shadow'] = 'red 2px 0px 0px';
            userOutPutRef.current.style['pointer-events'] = 'none';
        }
    }
    function resetWidth() {
        if (slideChecked) {
            userOutPutRef.current.style.width = '100%';
            userOutPutRef.current.style['pointer-events'] = 'none';
        }
    }

    return (
        <Stack>
            <OutPutHeader
                slideChecked={slideChecked}
                changeSlideCheckBoxValue={changeSlideCheckBoxValue}
                diffChecked={diffChecked}
                changeDiffCheckBoxValue={changeDiffCheckBoxValue}
            />
            <Stack gap={3}>
                <Stack className="align-items-center justify-content-center">
                    <BoxOutput diff={diffChecked}>
                        <div
                            className="output-container"
                            ref={outputContainerRef}
                            onMouseMove={imageCompareSlider}
                            onMouseLeave={resetWidth}
                            style={{ pointerEvents: slideChecked ? 'initial' : 'none' }}
                        >
                            <div
                                ref={userOutPutRef}
                                className="output-layer"
                                style={{ mixBlendMode: diffChecked ? 'difference' : 'normal' }}
                            >
                                <iframe
                                    id="source"
                                    className="iframe-output"
                                    width="400px"
                                    height="300px"
                                    title="output"
                                    sandbox="allow-same-origin"
                                    scrolling="no"
                                    ref={iframeRef}
                                    srcDoc={code}
                                ></iframe>
                            </div>
                            <img src={TestImg ? TestImg : UnknownBG} alt="level1" />
                        </div>
                    </BoxOutput>
                </Stack>
                <Stack direction="horizontal" className="justify-content-between">
                    <TextStyled>target</TextStyled>
                    <TextSmall>400px x 300px</TextSmall>
                </Stack>
                <Stack className="align-items-center justify-content-center">
                    <BoxOutput>
                        <Target>
                            <img
                                src={TestImg ? TestImg : UnknownBG}
                                className="target_img"
                                alt="target_img"
                            />
                        </Target>
                    </BoxOutput>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Output;
// <div id="img-layer" className="img-layer" ref={imgRef}></div>;
// onSelect={handleTypeChange}
