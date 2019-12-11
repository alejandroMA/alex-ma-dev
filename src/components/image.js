import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = () => {
    const data = useStaticQuery(graphql`
        query {
            profileImg: file(relativePath: { eq: "img/profile-pic.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 400, quality: 85) {
                        ...GatsbyImageSharpFluid_tracedSVG
                    }
                }
            }
        }
    `)

    return (
        <Img
            className="profile-img"
            fluid={data.profileImg.childImageSharp.fluid}
            alt="Alejandro"
            height="400"
            width="400"
        />
    )
}

export default Image
