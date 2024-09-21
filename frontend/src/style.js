import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
    background-size: cover;
    backdrop-filter: blur(5px); /* Adds a background blur */
    background-color:black;
`;

export const FormWrapper = styled.div`
    /* Semi-transparent background */
    padding: 20px;
    border-radius: 15px; /* Slightly larger border-radius for a smooth glass effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 
                inset 0 1px 10px rgba(255, 255, 255, 0.25); /* Adds inner shadow for a frosted look */
    backdrop-filter: blur(10px); /* Applies blur to content inside the glass */
    border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border for glass edge */
    max-width: 400px;
    width: 100%;
`;

export const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8); /* Lighter text for glass effect */
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
 /* Adjusted text color for glass look */
    font-family: times-new-roman;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1); /* Semi-transparent input background */
    font-size: 16px;
    color: white;
    &:focus {
        border-color: rgba(255, 255, 255, 0.4);
        outline: none;
        backdrop-filter: blur(5px);
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    background: rgba(0, 123, 255, 0.8); /* Adjusted button color */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background: rgba(0, 123, 255, 1);
    }
`;

export const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 10px;
`;




