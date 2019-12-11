module.exports = {
    // pathPrefix: `/test`,
    // assetPrefix: `/test`,
    siteMetadata: {
        title: `Alejandro Madariaga Angeles`,
        description: `Alejandro Madariaga Angeles personal website`,
        author: `@alejandromadari`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `media`,
                path: `${__dirname}/src`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `alejandro-madariaga-angeles`,
                short_name: `alejandro`,
                // start_url: `/test`,
                // start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/img/icon.png`
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ]
}
