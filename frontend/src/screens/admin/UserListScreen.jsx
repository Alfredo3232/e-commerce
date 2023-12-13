import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
    FaTimes,
    FaTrash,
    FaEdit,
    FaCheck
} from "react-icons/fa";

import { useGetUsersQuery } from "../../slices/usersApiSlice.js";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";


const UserListScreen = () => {
    const {
        data: users,
        refetch,
        isLoading,
        error
    } = useGetUsersQuery();

    const deleteHandler = (id) => { };

    return <>
        <h1>Users</h1>
        {isLoading ? <Loader /> : error ? (
            <Message variant="danger">
                {error}
            </Message>
        ) : (
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (
                                    <FaCheck style={{ color: "green" }} />
                                ) : (
                                    <FaTimes style={{ color: "red" }} />
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm">
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>

                                <Button
                                    variant="danger"
                                    className="btn-sm"
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <FaTrash style={{ color: "white" }} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>;
};

export default UserListScreen;