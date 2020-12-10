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
      DefaultRootObject: 'index.html',
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
            },
            ConnectionAttempts: 3,
            ConnectionTimeout: 10
          }
        ]
      },
      DefaultCacheBehavior: {
        TargetOriginId: `S3-${name}`,
        TrustedKeyGroups: {
          Quantity: 0,
          Enabled: false
        },
        ViewerProtocolPolicy: 'redirect-to-https',
        AllowedMethods: {
          Quantity: 2,
          Items: ['GET','HEAD']
        },
        SmoothStreaming: false,
        Compress: true,
        ForwardedValues: {
          QueryString: false,
          Cookies: {
            Forward: 'none'
          }
        },
        MinTTL: 0,
        MaxTTL: 31536000,
        DefaultTTL: 86400
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

  return {
    id: distribution.id
  }

}

export default createDistibution
