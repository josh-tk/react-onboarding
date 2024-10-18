import {useHistory} from 'react-router-dom';

/**
 * Custom hook to handle API errors and navigate to appropriate pages.
 * @returns {function} handleError - Function to handle the error and perform navigation.
 */
const useHandleError = function (): { handleError: (errorCode: number) => void } {
    const navigate = useHistory();

    const handleError = (errorCode: number): void => {
        switch (errorCode) {
            case 404:
                navigate.push('/404');
                break;
            default:
                navigate.push('/error');
        }
    };

    return {handleError};
};

export default useHandleError;
