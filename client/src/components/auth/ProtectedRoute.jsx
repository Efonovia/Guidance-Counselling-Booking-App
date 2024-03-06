import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
    const userInfo = useSelector(state => state.user)
    const authorized = Boolean(userInfo) && (userInfo.type === props.role)
    return(
        authorized ? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRoute