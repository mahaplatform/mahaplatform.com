import { cloudfront } from '@core/vendor/aws'
import moment from 'moment'

const createDistibution = async (req, params) => {

  const { name, aliases, aws_certificate_arn } = params

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
        Quantity: 2,
        Items: [
          {
            PathPattern: '_next*',
            TargetOriginId: `S3-${name}`,
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
            TargetOriginId: `S3-${name}`,
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
        Quantity: 1,
        Items: [
          {
            Id: `S3-${name}`,
            DomainName: `${process.env.AWS_WEB_BUCKET}.s3-website-us-east-1.amazonaws.com`,
            OriginPath: `/${name}`,
            CustomOriginConfig: {
              HTTPPort: '80',
              HTTPSPort: '443',
              OriginProtocolPolicy: 'http-only'
            }
          }
        ]
      },
      DefaultCacheBehavior: {
        TargetOriginId: `S3-${name}`,
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
            ErrorCachingMinTTL: 10,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          },{
            ErrorCode: 404,
            ErrorCachingMinTTL: 300,
            ResponseCode: '200',
            ResponsePagePath: '/index.html'
          }
        ]
      },
      Comment: name,
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
