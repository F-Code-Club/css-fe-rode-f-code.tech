const ViewFE = ({ question, questionIndex }) => {
    return(
        <div>
            <h2 className='question-title'>Question {questionIndex + 1}</h2>
            <div className="row">
                <div className="col-md-6">   
                   <div className="row">
                        <div className="col-md-6">
                            <span >Maximum Submit Time:</span>
                            <span>{question.maxSubmitTimes}</span>
                        </div>
                        <div className="col-md-6">
                            <span>Score:</span>
                            <span>{question.score}</span>
                        </div>
                   </div>
                    <div className="row">
                        <div>
                            <label>Image</label>
                            
                             {question?.template?.url ? (
                                <div className="position-relative" style={{ width: '300px'}}>
                                <input value={question.template.url}/>
                                <img
                                    style={{ width: '300px', height: '250px', objectFit: 'cover', marginBottom: '20px' }} 
                                    src={question.template.url} 
                                    alt="Image" 
                                />
                                </div>
                            ) : (
                                <div style={{ width: '300px', height: '200px' }}>None</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div>
                        <label htmlFor="color">Color</label>
                        <div>
                            {question?.template?.colorCode?.split(',').map((color, colorIdx) => { 
                                if (!color) return;
                                return (
                                    <div key={colorIdx}>
                                        <div style={{backgroundColor: color}}></div>
                                        <p>{color}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ViewFE;