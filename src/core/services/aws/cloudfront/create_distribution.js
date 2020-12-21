import { cloudfront } from '@core/vendor/aws'
import moment from 'moment'

const createDistibution = async (req, params) => {

  const { code, aliases, aws_certificate_arn } = params

  const name = `${code}.mahaplatform.com`

  const distribution = await cloudfront.createDistribution({
    DistributionConfig: {
      CallerReference: moment().format('x'),
      Aliases: {
        Quantity: aliases.length + 1,
        Items: [
          name,
          ...aliases || []
        ]
      },
      CacheBehaviors: {
        Quantity: 3,
        Items: [
          {
            PathPattern: 'imagecache*',
            TargetOriginId: `${code}-cdn`,
            ViewerProtocolPolicy: 'https-only',
            AllowedMethods: {
              Quantity: 2,
              Items: ['GET','HEAD']
            },
            Compress: true,
            TrustedSigners: {
              Enabled: false,
              Quantity: 0,
              Items: []
            },
            ForwardedValues: {
              QueryString: false,
              Cookies: {
                Forward: 'none'
              },
              Headers: {
                Quantity: 0,
                Items: []
              }
            },
            MinTTL: 0,
            MaxTTL: 31536000,
            DefaultTTL: 86400
          }, {
            PathPattern: '_next*',
            TargetOriginId: `${code}`,
            ViewerProtocolPolicy: 'https-only',
            AllowedMethods: {
              Quantity: 2,
              Items: ['GET','HEAD']
            },
            Compress: true,
            TrustedSigners: {
              Enabled: false,
              Quantity: 0,
              Items: []
            },
            ForwardedValues: {
              QueryString: false,
              Cookies: {
                Forward: 'none'
              },
              Headers: {
                Quantity: 1,
                Items: [ 'Origin' ]
              }
            },
            MinTTL: 0,
            MaxTTL: 31536000,
            DefaultTTL: 86400
          }, {
            PathPattern: 'static*',
            TargetOriginId: `${code}`,
            ViewerProtocolPolicy: 'https-only',
            AllowedMethods: {
              Quantity: 2,
              Items: ['GET','HEAD']
            },
            Compress: true,
            TrustedSigners: {
              Enabled: false,
              Quantity: 0,
              Items: []
            },
            ForwardedValues: {
              QueryString: false,
              Cookies: {
                Forward: 'none'
              },
              Headers: {
                Quantity: 1,
                Items: [ 'Origin' ]
              }
            },
            MinTTL: 0,
            MaxTTL: 31536000,
            DefaultTTL: 86400
          }
        ]
      },
      Origins: {
        Quantity: 3,
        Items: [
          {
            Id: `${code}`,
            DomainName: `${process.env.AWS_WEB_BUCKET}.s3-website-us-east-1.amazonaws.com`,
            OriginPath: `/${code}`,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'http-only'
            }
          }, {
            Id: `${code}-current`,
            DomainName: `${process.env.AWS_WEB_BUCKET}.s3-website-us-east-1.amazonaws.com`,
            OriginPath: `/${code}/current`,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'http-only'
            }
          }, {
            Id: `${code}-cdn`,
            DomainName: `assets.${process.env.DOMAIN}`,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'https-only'
            }
          },
        ]
      },
      DefaultCacheBehavior: {
        TargetOriginId: `${code}-current`,
        ViewerProtocolPolicy: 'redirect-to-https',
        AllowedMethods: {
          Quantity: 2,
          Items: ['GET','HEAD']
        },
        Compress: true,
        TrustedSigners: {
          Enabled: false,
          Quantity: 0,
          Items: []
        },
        ForwardedValues: {
          QueryString: false,
          Cookies: {
            Forward: 'none'
          },
          Headers: {
            Quantity: 1,
            Items: [ 'Origin' ]
          }
        },
        MinTTL: 0
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
        ACMCertificateArn: aws_certificate_arn,
        CloudFrontDefaultCertificate: false,
        MinimumProtocolVersion: 'TLSv1.2_2019',
        SSLSupportMethod: 'sni-only'
      }
    }
  }).promise()

  await cloudfront.waitFor('distributionDeployed', {
    Id: distribution.Id
  }).promise()

  return {
    aws_cloudfront_id: distribution.Id
  }

}

export default createDistibution
