import styled, { keyframes, css } from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

export const Form = styled.form`
    margin-top: 24px;
    display: flex;
    gap: 8px;

    input{
        flex: 1;
        border: 1px solid #ddd;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 16px;
    }
`;

const animate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs( props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background-color: #0D2636;
    border: 0;
    border-radius: 4px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all;

    &:hover{
        background-color:rgb(32, 79, 109)
    }

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.7;
    }

    ${props => props.loading && 
    css`
        svg{
            animation: ${animate} 2s linear infinite;
        }
    `
    }
`;


export const List = styled.ul`
    list-style: none;
    margin: 16px 0 0 0;

    li{
        padding: 16px 0;
        display: flex;
        justify-content: space-between;
        & + li {
            border-top: 1px solid #efefef
        }

        a{
            color: #0d2636;
            &:hover{
                color:rgb(32, 79, 109)
            }
        }
        span{
            display: flex;
            gap: 12px;
            align-items: center;
        }
    }
`;



export const DeleteButton = styled.button.attrs( props => ({
    type: 'button',
}))`
    background: none;
    color:rgb(218, 60, 60);
    border: none;
    outline: 0;
    border-radius: 4px;
    padding: 4px;
    transition: 0.3s all;
    &:hover{
        color:rgb(248, 69, 69);
    }
`;
