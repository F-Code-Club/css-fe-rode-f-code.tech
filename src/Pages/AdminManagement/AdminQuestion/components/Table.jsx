import { Table } from 'react-bootstrap';

import DateFormat from "../../AdminRoom/components/FilterRoom/DateFormat.jsx";
import {TfiInfinite} from "react-icons/tfi";
import More from "./More.jsx";
import {useEffect} from "react";

function TableQuestion({listQuestion }) {
    useEffect(() => {
        console.log(listQuestion)
    }, [listQuestion]);
    const results = listQuestion
        .map((question) => (
            <tr key={question.id}>
                <td>{question.name}</td>
                <td>{question.stackMax}</td>
                <td>{question.type}</td>
                <td>{question.status}</td>
                <td>{DateFormat(question.createdAt)}</td>
                <td>
                    <More questionId={question.id} />
                </td>
            </tr>
        ));

    return (
        <Table striped className="w-98 border-top">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Max Question</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Create At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {results?.length ? (
                results
            ) : (
                <tr>
                    <td className="text-center" colSpan={1000}>
                        No data available in table
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
}
export default TableQuestion;
