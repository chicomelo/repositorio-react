import { useCallback, useEffect, useState } from 'react'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import api from '../../services/api'
import { Link } from 'react-router-dom' 

export default function Main() {
    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState(() => {
        const savedRepos = localStorage.getItem('repos')
        return savedRepos ? JSON.parse(savedRepos) : []
    })
    const [loading, setLoading] = useState(false)
    const [alerta, setAlerta] = useState(null)

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])

    function handleInputChange(e) {
        setNewRepo(e.target.value)
        setAlerta(null)
    }

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()

            async function submit() {
                setLoading(true)
                setAlerta(null)

                try {
                    if (newRepo.trim() === '') {
                        throw new Error('Você precisa digitar um repositório válido.')
                    }

                    const response = await api.get(`repos/${newRepo}`)
                    const repoName = response.data.full_name

                    setRepositorios((prevRepos) => {
                        if (prevRepos.some((repo) => repo.name === repoName)) {
                            setAlerta('Repositório já cadastrado.')
                            return prevRepos
                        }

                        return [...prevRepos, { name: repoName }]
                    })

                    setNewRepo('')
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        setAlerta('Repositório não encontrado!')
                    } else {
                        setAlerta(error.message)
                    }
                } finally {
                    setLoading(false)
                }
            }

            submit()
        },
        [newRepo]
    )

    const handleDelete = useCallback((repo) => {
        setRepositorios((prevRepos) => prevRepos.filter((r) => r.name !== repo))
    }, [])

    return (
        <Container>
            <h1>
                <FaGithub size={24} />
                Meus Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    value={newRepo}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Adicionar repositório"
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? <FaSpinner color="#fff" size={14} /> : <FaPlus color="#fff" size={14} />}
                </SubmitButton>
            </Form>

            {alerta && <div style={{ color: 'red', marginTop: '10px' }}>{alerta}</div>}

            <List>
                {repositorios.map((repo) => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}
