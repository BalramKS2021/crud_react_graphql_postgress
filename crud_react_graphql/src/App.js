import React,{useState} from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag/lib/index";
import { Link } from 'react-router-dom';

const READ_TODOS = gql`
  query Query{
    users {
      id
      firstname
      lastname
      nickname
      email
      password
    }
  }
`;

const CREATE_TODO = gql`
  mutation Mutation($firstname: String!, $lastname: String!, $nickname: String!, $email: String!, $password: String!){
    createUser(data: {
      firstname: $firstname,
      lastname: $lastname,
      nickname: $nickname,
      email: $email,
      password: $password
    }) {
      id
    }
  }
`;

const REMOVE_TODO = gql`
  mutation Mutation($id: String!) {
    deleteUser(id: $id)
  }
`;

function App() {
  const { data, loading, error } = useQuery(READ_TODOS);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [createUser] = useMutation(CREATE_TODO);

  const [user, setUser] = useState({});
  const handleOnChange = (event)=> {
    setUser({ ...user, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event)=> {
    createUser({variables: { ...user }});
    event.preventDefault();
    window.location.reload();
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="app">
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Firstname" onChange={handleOnChange} type="text" name="firstname" required/><br/>
        <input placeholder="Lastname" onChange={handleOnChange} type="text" name="lastname" required/><br/>
        <input placeholder="Nick name" onChange={handleOnChange} type="text" name="nickname" required/><br/>
        <input placeholder="Eamil" onChange={handleOnChange} type="text" name="email" required/><br/>
        <input placeholder="Password" onChange={handleOnChange} type="text" name="password" required/>
        <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
      </form>
      <table>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Nick Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {data.users.map((item) => {
                return <tr key={item.id}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.nickname}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/edit/${item.id}`} className="btn btn-success">Edit</Link>
                    </td>
                    <td>
                      <button onClick={()=>{if(window.confirm("Are you sure to delete this user?")) {
                        deleteTodo({ variables: { id: item.id } });
                        window.location.reload();
                      }}}>Delete</button>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;