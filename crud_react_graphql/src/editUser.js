import React,{useState} from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag/lib/index";
const READ_TODOS = gql`
    query Query($userId: String!) {
        user(id: $userId) {
            id
            firstname
            lastname
            nickname
            email
            password
        }
    }
`;

const UPDATE_TODO = gql`
  mutation Mutation($id: String!, $firstname: String!, $lastname: String!, $nickname: String!, $email: String!, $password: String!){
    updateUser(
      id: $id,
      data: {
        firstname: $firstname,
        lastname: $lastname,
        nickname: $nickname,
        email: $email,
        password: $password
      }
    ) {
      id
    }
  }
`;
function EditUser(props) {
    const { id } = props.match.params;

    const { data, loading, error} = useQuery(READ_TODOS,{ variables: { userId: `${id}` } });
    
    const [updateTodo] = useMutation(UPDATE_TODO);

    const [user, setUser] = useState({});

    const handleOnChange = (event)=> {
        setUser({ ...user, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event)=> {
        console.log(user);
        updateTodo({variables: {...user,id:id}});
        event.preventDefault();
        window.location.href="/";
    }
    if (loading) return <p>loading...</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    console.log(data['user'])
    return (
        <div className="app">
        <h3>Update User</h3>
        <form onSubmit={handleSubmit}>
            <input placeholder="Firstname" onChange={handleOnChange} type="text" name="firstname" required /><br/>
            <input placeholder="Lastname" onChange={handleOnChange} type="text" name="lastname" required/><br/>
            <input placeholder="Nick name" onChange={handleOnChange} type="text" name="nickname" required/><br/>
            <input placeholder="Email" onChange={handleOnChange} type="text" name="email" required /><br/>
            <input placeholder="Password" onChange={handleOnChange} type="text" name="password" required />
            <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
        </form>
        </div>
    );
}

export default EditUser;