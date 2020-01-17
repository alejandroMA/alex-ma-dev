import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'
import {
    faTwitter,
    faLinkedin,
    faGithub
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

function IndexPage() {
    const data = useStaticQuery(graphql`
        query {
            resume: file(relativePath: { eq: "pdfs/Resume.pdf" }) {
                publicURL
                name
            }
            portfolio: file(relativePath: { eq: "pdfs/Portfolio.pdf" }) {
                publicURL
                name
            }
        }
    `)

    return (
        <Layout>
            <SEO title="Hi" />

            <header className="header">
                <div className="spacer"></div>
                <div className="profile-img-wrapper">
                    <Image />
                </div>

                <h1>Alejandro Madariaga Angeles</h1>
                <h3>Software Engineer in Querétaro, México</h3>
            </header>

            <div className="links">
                <ul>
                    <li>
                        <a href={data.resume.publicURL}>Resume</a>
                    </li>
                    <li>
                        <a href={data.portfolio.publicURL}>Portfolio</a>
                    </li>
                </ul>
            </div>

            <div className="icons">
                <a
                    href="https://github.com/alejandroMA"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FAIcon icon={faGithub} />
                </a>
                <a
                    href="https://www.linkedin.com/in/alejandro-madariaga-angeles/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FAIcon icon={faLinkedin} />
                </a>
                <a
                    href="https://twitter.com/alejandromadari"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FAIcon icon={faTwitter} />
                </a>
                <a
                    href="mailto:amndell@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FAIcon icon={faEnvelope} />
                </a>
            </div>
        </Layout>
    )
}

export default IndexPage
