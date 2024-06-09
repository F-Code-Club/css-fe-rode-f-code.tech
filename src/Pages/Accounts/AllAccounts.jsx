import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-bootstrap';
import { useParams, Link, useLocation, useSearchParams } from 'react-router-dom';

import accountsApi from '../../utils/api/accountsApi';
import { DateFormatS } from '../../utils/helper';
import './AllAccounts.scss';
import Join from './components/Join';
import More from './components/More';
import PaginationAccounts from './components/PaginationAccounts';
import Search from './components/Search';
import { RoomStyle } from './style';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const AllAccounts = () => {
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams(location.search);
    const { id } = useParams();
    //giá trị còn fixed cứng -> cần thay đổi khúc này
    const searchValue = searchParams.get('search') || '';
    const filterRoom = searchParams.get('filter.room') || '';
    const [totalPages, setTotalPages] = useState(1);
    const [listAttend, setListAttend] = useState([]);
    const [meta, setMeta] = useState();
    //search and filter
    // const [searchTerm, setSearchTerm] = useState('');

    //pagination and current page
    const [currentPage, setCurrentPage] = useState(meta?.currentPage || 1);
    const handleSearchInputChange = (event) => {
        // let params = serializeFormQuery(event.target);
        setSearchParams((prevSearchParams) => {
            const newSearchParams = new URLSearchParams(prevSearchParams);
            newSearchParams.set(`${event.target.name}`, event.target.value);
            return newSearchParams;
        });
        // setSearchTerm(event.target.value);
        // setCurrentPage(1);
    };

    const handleFilterChange = (event) => {
        setSearchParams((prevSearchParams) => {
            const newSearchParams = new URLSearchParams(prevSearchParams);
            newSearchParams.set('filter.attendance', event.target.value);
            return newSearchParams;
        });
        // setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const [accounts, setAccounts] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchDataFilter = async () => {
            const filter = {
                room: 'filter.room',
                joinAt: 'filter.joinAt',
                isActive: 'filter.isActive',
            };
            let req = {
                roomId: id,
                page: currentPage,
                limit: 100,
                search: searchValue,
                [filter.isActive]: status === '' ? null : status,
                [filter.room]: filterRoom,
            };

            accountsApi.getAll(req).then((response) => {
                setAccounts(response.data.data.data);
                setTotalPages(response.data.data.totalItems);
                setCurrentPage(currentPage);
            });
        };
        fetchDataFilter();
    }, [searchValue, filterRoom, currentPage, status]);
    return (
        <div className="p-2">
            <RoomStyle>
                <div className="box-style">
                    <Col className="p-3">
                        <Row className="color-primary mb-3">
                            <h3 className="fw-bold">User Management</h3>
                        </Row>
                        <Row className="d-flex justify-content-around align-items-center mb-3">
                            <Col className="col-4">
                                <Search action={handleSearchInputChange} value={searchValue} />
                            </Col>
                            <Col className="col-5 d-flex ">
                                <Join />
                            </Col>
                            <Col className="col-3 d-flex align-items-center justify-content-end">
                                <div className="accounts-status">
                                    <label htmlFor="">Status</label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={status}
                                        onChange={(e) => setStatus(e.currentTarget.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                </div>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Date of Birth</th>
                                        <th>Join at</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((account) => (
                                        <tr key={account.id}>
                                            <td>{account.studentId}</td>
                                            <td>{account.fullName}</td>
                                            <td>{account.email}</td>
                                            <td>{account.phone}</td>
                                            <td>{DateFormatS(account.dob)} </td>
                                            <td>01/01/2022</td>
                                            <td className="d-flex" style={{ alignItems: 'center' }}>
                                                {account.isActive ? (
                                                    <span className="accounts isActive">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="accounts isLocked">
                                                        Locked
                                                    </span>
                                                )}
                                                <More id={account.id} setAccounts={setAccounts} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <PaginationAccounts
                        action={handlePageChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </div>
            </RoomStyle>
        </div>
    );
};

export default AllAccounts;
