import React from 'react';

import ButtonStyled from '../../../../components/Button';
import * as St from '../styles';
import { editColor, addColor } from './utils';

const AddColor = ({ questionIdx, setQuestions, question, error }) => {
    return (
        <div>
            <label htmlFor="color">Color</label>
            <div>
                {question.colors?.split(',').map((color, colorIdx) => { //value, index 
                    if (!color) return;
                    return (
                        <St.ColorWrapper key={colorIdx}>
                            <St.Color color={color}></St.Color>
                            <input
                                value={color}
                                onChange={(e) =>
                                    editColor(e.target.value, questionIdx, colorIdx, setQuestions)
                                }
                            />
                        </St.ColorWrapper>
                    );
                })}
            </div>
            <h6 className="text-danger">{error}</h6>
            <ButtonStyled buttonType="dashed" onClick={() => addColor(questionIdx, setQuestions)}>
                Add color
            </ButtonStyled>
        </div>
    );
};

export default AddColor;
