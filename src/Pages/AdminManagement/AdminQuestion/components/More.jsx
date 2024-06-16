import * as React from 'react';
import { useState } from 'react';

import { Dropdown, DropdownButton } from 'react-bootstrap/esm';
import { Link } from 'react-router-dom';

// import Loading from '../../../../../components/Loading';
import ModalComponent from '../../../../components/Modal';

const More = ({ questionId }) => {
    // const dayOpen = new Date(openTime).getTime();
    // let timeCompare = Date.now() > dayOpen;
    // const [checkTime, setCheckTime] = useState(timeCompare);
    const [show, setShow] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const actions = [
        {
            id: 1,
            href: `/admin/room/${questionId}`,
            value: 'Question',
        },
        { id: 4, value: 'Delete', func: () => setShow(true) },
    ];
    return (
        <>
            <DropdownButton
                align="start"
                variant="outline"
                title={<i className="bi bi-three-dots-vertical bg-secondary-1 btn-hover"></i>}
                style={{ width: '50px' }}
                bsPrefix="w-75 d-flex justify-content-center dropdown-style-2 w-50"
            >
                {actions.map((item) => {
                    return (
                        <Dropdown.Item
                            // as={<Link />}
                            key={item.id}
                            eventKey={item.id}
                            href={item.href}
                            className="w-100"
                            onClick={item.func}
                        >
                            {item.value}
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
            <ModalComponent
                show={show}
                close={() => setShow(false)}
                value="Close"
                value2="Delete"
                title="Delete Room"
                body="Are you sure to delete this room?"
                className="text-danger"
                variant1="grey"
                variant2="red"
            />
            <ModalComponent
                show={showWarning}
                close={() => setShowWarning(false)}
                value2="OK"
                title="Edit Room Failed!"
                body="This room has been already started!"
                className="text-danger"
                variant1="d-none"
                variant2="green xxl"
                showOneBtn={true}
            />
        </>
    );
};
export default More;
