import {useNavigate} from 'react-router-dom';

/**
 * Custom hook to handle API errors and navigate to appropriate pages.
 * @returns {function} handleError - Function to handle the error and perform navigation.
 */
const useHandleError = () => {
    const navigate = useNavigate();

    const handleError = (errorCode: number): void => {
        switch (errorCode) {
            case 404:
                navigate('/404');
                break;
            default:
                navigate('/error');
        }
    };

    return {handleError};
};

export default useHandleError;
