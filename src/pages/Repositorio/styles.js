import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;
    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    @media (max-width: 768px) {
        max-width: 90%;
        padding: 16px;
        margin: 20px auto;
    }
`;

export const Owner = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    img{
        max-width: 120px;
        width: 100%;
        display: block;
        border-radius: 20%;
    }

    h1{
        font-size: 32px;
        line-height: 1.4;
        color: #0D2636;
    }
    h2{
        font-size: 16px;
        color: #999;
        line-height: 1.4;
        text-align: center;
        max-width: 50%;
    }

    @media (max-width: 768px) {
        img{
            max-width: 92px;
        }
        h1 {
            font-size: 24px;
        }
        h2 {
            font-size: 14px;
            max-width: 80%;
        }
    }
`;

export const BackButton = styled(Link)`
    border: 0;
    background-color: transparent;
    outline: 0;
    svg{
        fill: #0D2636;
        transition: 0.3s all;
    }

    &:hover{
        svg{
            fill:rgb(32, 79, 109)
        }
        
    }
  
`;

export const IssuesList = styled.ul`
    padding: 24px 0 0 0;
    list-style: none;

    li{
        display: flex;
        padding: 12px 0;
        gap: 16px;
        img{
            display: block;
            max-width: 42px;
            max-height: 42px;
            border-radius: 50%;
        }
        & + li{
            border-top: 1px solid #eee;
        }
        div{
            strong{
                a{
                    text-decoration: none;
                    color:rgb(31, 94, 153);
                    transition: 0.3s all;
                    line-height: 1.4;
                    font-size: 16px;
                    margin: 4px 0;
                    display: block;
                    &:hover{
                        color:rgb(37, 141, 238);
                    }
                }
            }
            div{
                display: flex;
                align-items: center;

                span{
                    background-color: #333;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 6px 12px 4px 12px;
                    margin-right: 8px;
                    border-radius: 20px;
                }
            }
            p{
                font-size: 16px;
                
            }
        }
    }

    @media (max-width: 768px) {
        padding: 16px 0 0 0;
        li{
            display: flex;
            padding: 12px 0;
            gap: 8px;
            img{
                max-width: 36px;
                max-height: 36px;
            }
            div{
                strong{
                    a{
                        font-size: 14px;
                    }
                }
                div{
                    flex-wrap: wrap;
                    gap: 4px;
                    span{
                        font-size: 10px;
                        padding: 4px 12px;
                    }
                }
                p{
                    font-size: 14px;
                }
            }
        }
    }
`;


export const PageActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    padding-top: 16px;
    border-top: 1px solid #eee;

    button{
        outline: 0;
        border: 0;
        background-color: rgb(31, 94, 153);;
        color: #fff;
        border-radius: 4px;
        padding: 8px 16px;
        transition: 0.3s all;
        font-size: 14px;
        &:hover{
            background-color:rgb(37, 141, 238);
        }
        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    
    @media (max-width: 768px) {
        button{
            font-size: 12px;
        }

    }
`;


export const FilterList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1px;
    margin: 16px 0 0 0;
`;


export const FilterButton = styled.button.attrs( props => ({
    type: 'button',
}))`
    background-color: ${({ active }) => (active ? 'rgb(32, 79, 109)' : '#ccc')};
    border: 0;
    border-radius: 4px;
    padding: 6px 12px;
    color: ${({ active }) => (active ? '#fff' : '#666')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all;
    font-size: 14px;
    &:hover{
        background-color: ${({ active }) => (active ? 'rgb(32, 79, 109)' : '#e0e0e0')};
    }
`;