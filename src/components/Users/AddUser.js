import { useState, Fragment } from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import Wrapper from '../Helpers/Wrapper'
import classes from './AddUser.module.css'

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredAge, setEnteredAge] = useState('')
    const [error, setError] = useState()

    const addUserHandler = event => {
        event.preventDefault()
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter values for name and age.'
            })
            return
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a non-negative age.'
            })
            return
        }
        props.onAddUser(enteredUsername, enteredAge)
        setEnteredUsername('')
        setEnteredAge('')
    }

    const usernameChangeHandler = event => {
        setEnteredUsername(event.target.value)
    }

    const ageChangeHandler = event => {
        setEnteredAge(event.target.value)
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" onChange={usernameChangeHandler} value={enteredUsername} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" onChange={ageChangeHandler} value={enteredAge} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Fragment>
    )
}

export default AddUser