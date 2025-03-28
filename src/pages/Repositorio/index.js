import { useParams } from "react-router-dom"
import { Container, Owner, Loading, BackButton, FilterList, IssuesList, PageActions, FilterButton } from './styles'
import { useEffect, useState } from "react"
import { FaArrowLeft } from 'react-icons/fa'
import api from "../../services/api"


export default function Repositorio(){

    const { repositorio } = useParams()

    const [detalheRepositorio, setDetalheRepositorio] = useState({})
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [issuesStatus, setIssuesStatus] = useState('all')

    useEffect(()=>{
        async function load(){
            const [ repositorioData, issuesData ] = await Promise.all([
                api.get(`/repos/${repositorio}`, {
                    params: {
                        state: 'all',
                        per_page: 5
                    }
                }),
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state: 'all',
                        per_page: 5
                    }
                })
            ])
            setDetalheRepositorio(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }

        load()
    }, [repositorio])

    useEffect(() => {
        async function loadIssues(){
            const response = await api.get(`/repos/${repositorio}/issues`, {
                params: {
                    state: issuesStatus,
                    page,
                    per_page: 5
                }
            });
            setIssues(response.data);
        }
    
        loadIssues();
    }, [page, issuesStatus, repositorio]);

    async function changeStatusIssues(status){
        setIssuesStatus(status);
        setPage(1);
        
        const response = await api.get(`/repos/${repositorio}/issues`, {
            params: {
                state: status,
                page: 1,
                per_page: 5
            }
        });
    
        setIssues(response.data);
    }

    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1 )
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando</h1>
            </Loading>
        )
    }

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={24}></FaArrowLeft>
            </BackButton>
            <Owner>
                <img src={`${detalheRepositorio.owner.avatar_url}`} alt={`${detalheRepositorio.owner.login}`} />
                <h1>{detalheRepositorio.name}</h1>
                <h2>{detalheRepositorio.description}</h2>
            </Owner>

            <FilterList>

                <FilterButton 
                    onClick={() => changeStatusIssues('all')}
                    active={issuesStatus === 'all' ? 1 : 0}>
                    Todas
                </FilterButton>

                <FilterButton 
                    onClick={() => changeStatusIssues('open')}
                    active={issuesStatus === 'open'  ? 1 : 0}>
                    Abertas
                </FilterButton>

                <FilterButton 
                    onClick={() => changeStatusIssues('closed')}
                    active={issuesStatus === 'closed'  ? 1 : 0}>
                    Fechadas
                </FilterButton>

            </FilterList>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <p>{issue.user.login}</p>
                            <strong>
                                <a href={issue.html_url}>
                                    {issue.title}
                                </a>
                            </strong>
                            <div>
                                {issue.labels.map(label =>(
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button type="button"
                    disabled={page < 2}
                    onClick={()=>handlePage('back')}>
                        Anterior
                </button>
                <button type="button"
                    onClick={()=>handlePage('next')}>
                        Próxima
                </button>
            </PageActions>

        </Container>
    )
}