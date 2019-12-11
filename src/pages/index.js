import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
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
            <SEO title="Home" />

            <header className="header">
                <div className="spacer"></div>
                <div className="profile-img-wrapper">
                    <Image />
                </div>

                <h1>Alejandro Madariaga Angeles</h1>
                <h3>Software Engineer in Querétaro, México</h3>
            </header>

            <div>
                <ul>
                    <li>
                        <a href={data.resume.publicURL}>Resume</a>
                    </li>
                    <li>
                        <a href={data.portfolio.publicURL}>Potfolio</a>
                    </li>
                    <li>
                        <a href=""></a>
                    </li>
                </ul>
            </div>
        </Layout>
    )
}

export default IndexPage
