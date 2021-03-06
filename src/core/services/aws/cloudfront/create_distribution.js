import { cloudfront } from '@core/vendor/aws'
import moment from 'moment'

const createDistibution = async (req, params) => {

  const { code, aliases } = params

  const { Id } = await cloudfront.createDistribution({
    DistributionConfig: {
      CallerReference: moment().format('x'),
      DefaultRootObject: 'index.maha',
      Aliases: {
        Quantity: aliases.length,
        Items: aliases
      },
      CacheBehaviors: {
        Quantity: 3,
        Items: [
          {
            PathPattern: 'api*',
            TargetOriginId: `${code}-api`,
            ViewerProtocolPolicy: 'https-only',
            AllowedMethods: {
              Quantity: 7,
              Items: ['GET','HEAD','OPTIONS','PUT','POST','PATCH','DELETE']
            },
            Compress: true,
            TrustedSigners: {
              Enabled: false,
              Quantity: 0,
              Items: []
            },
            ForwardedValues: {
              QueryString: true,
              Cookies: {
                Forward: 'none'
              },
              Headers: {
                Quantity: 0,
                Items: []
              }
            },
            MinTTL: 0,
            MaxTTL: 0,
            DefaultTTL: 0
          }, {
            PathPattern: 'imagecache*',
            TargetOriginId: `${code}-cdn`,
            ViewerProtocolPolicy: 'https-only',
            CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
            AllowedMethods: {
              Quantity: 2,
              Items: ['GET','HEAD']
            },
            Compress: true,
            TrustedSigners: {
              Enabled: false,
              Quantity: 0,
              Items: []
            }
          }, {
            PathPattern: '_next*',
            TargetOriginId: `${code}-next`,
            ViewerProtocolPolicy: 'https-only',
            CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
            AllowedMethods: {
              Quantity: 2,
              Items: ['GET','HEAD']
            },
            Compress: true,
            TrustedSigners: {
              Enabled: false,
              Quantity: 0,
              Items: []
            }
          }
        ]
      },
      Origins: {
        Quantity: 4,
        Items: [
          {
            Id: `${code}-api`,
            DomainName: 'mahaplatform.com',
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'https-only'
            }
          }, {
            Id: `${code}-cdn`,
            DomainName: 'assets.mahaplatform.com',
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'https-only'
            }
          }, {
            Id: `${code}-next`,
            DomainName: process.env.WEB_DOMAIN,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'https-only'
            }
          }, {
            Id: `${code}-web`,
            DomainName: process.env.WEB_DOMAIN,
            OriginPath: `/websites/${code}`,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'https-only'
            }
          }
        ]
      },
      DefaultCacheBehavior: {
        TargetOriginId: `${code}-web`,
        ViewerProtocolPolicy: 'redirect-to-https',
        CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
        AllowedMethods: {
          Quantity: 2,
          Items: ['GET','HEAD']
        },
        Compress: true,
        TrustedSigners: {
          Enabled: false,
          Quantity: 0,
          Items: []
        }
      },
      CustomErrorResponses: {
        Quantity: 2,
        Items: [
          {
            ErrorCode: 403,
            ErrorCachingMinTTL: 300,
            ResponseCode: '404',
            ResponsePagePath: '/404'
          }, {
            ErrorCode: 404,
            ErrorCachingMinTTL: 300,
            ResponseCode: '404',
            ResponsePagePath: '/404'
          }
        ]
      },
      Comment: code,
      Enabled: true,
      ViewerCertificate: {
        ACMCertificateArn: process.env.AWS_CERTIFICATE_ARN,
        CloudFrontDefaultCertificate: false,
        MinimumProtocolVersion: 'TLSv1.2_2019',
        SSLSupportMethod: 'sni-only'
      }
    }
  }).promise()

  await cloudfront.waitFor('distributionDeployed', {
    Id
  }).promise()

  const distribution = await cloudfront.getDistribution({
    Id
  }).promise()

  return {
    aws_cloudfront_id: distribution.Id,
    aws_cloudfront_subdomain: distribution.DomainName.replace('.cloudfront.net','')
  }

}

export default createDistibution
