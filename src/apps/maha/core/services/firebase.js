import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert({
    'type': 'service_account',
    'project_id': 'mahaplatform',
    'private_key_id': '9f9db4cd59eeb42a294b5ff297d1bc96f4f2a12d',
    'private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDejWPKtcDjkHxC\nAZULQqKVif8+pLUb/93Z0Loc5m/cHWx9Y1Q+gnf7eMclURpXZDeA/Yu2v1kvUvLL\nEAQ53ev0dbgnDbxfGBdyaSlItN3ZCXphH14vDdDmDZjzk7CIMN5PRLqIV7OMDEli\nN7LtUIS714a2/Csoj7iR3djaYVTMwWoDryLZJOsN+wR7SNMvq4oD4SXdGTiMPEO6\nzSouu4qAD6aCHVmRS7SbcRO6zyPAJ5szgoHIcM4Qsosqlx7BhO6zWiAH4qW8n4lz\nyMOnGVOVNJupg6hho0OTIJ/Z1h7bTaQomZxJAHOPF/590KWlXdym9Jr/ddLp6TMD\nARK3YpB1AgMBAAECggEAYJ3KQnEoZcLOpwsvzN0nXzszE9uGgrrQceTDP5Os4Ubm\n2AKcyqxycTpMXn94q5Lm47lvA63LhpeArzZrV0HoU08d3NqCOlhnqXRNB3L50uTh\n+7MV/OCHHbCug6RM4bsxcAFa56EHYhfdbeXXaF5p2XCmW99azzehvbWtlJTnryHD\nPCeInVaW3sAC9DMJmiwLYwggDPR8H5n5buJqwGwuX7DnETXGO4Gbz4eS9sJiUGxm\nGaMFvpryJItJn27Ej8UllQ9Zo34rKfnE7uXA3mhtYGALd0gRWoAn9HSkdjVUFksB\nC/6Sy7PGuEhyHdL44ykG9TrY4mk1Wap8KEzMmhGmawKBgQD4pPPMnPz2QcJq1C+h\nkBKumrMtbDx4LTrTpqB4bL89gOVqY4lG0qd6M2sag5DKH9wheDrv9Tq+3fwXn1A2\nOJGnpeLHtYyyYP0ARsIkowBSHa+9e8wrzt/Z1DyjXqvxY5vYMdvEg+AsFc7K7r8V\n+DN+xJ+p79DWKnWp2teoCGrAdwKBgQDlItXyAWhmoB13MaHz5HE0EK+42As82r32\nlnRiAxEnqWHceN9YNZ2t7pO1/Y9rWVdMYerJJGV1FsMCvvz2+LbWHFqF+3IvJ+Or\n5+BXngUT3nxVvhOeOEb1+ZGSarEVPpW5oqktRyAM6m+WN4rBOLCuCvxH9rcf27gi\n51ed3Sx9cwKBgBlMTzHmVyaHEkzkQeRiUERLoSdh99USZQXb0j/ucJbFYpIshm8a\nR8f7K06LTFQEYdVV8kkv3kZFN7z/jJ23q7ou+p/vLN2JWLSKfn5Tx1iThKn2ypM6\nfTQgj/rfSwdIZzbb+8xGzqwtm9ix6edGVZb0Unpr2AeyUj5x8bc7BAGJAoGAZl8J\n9vVqD2+5umcSVETbzscluw/K9YVFGcZeeOul3nJupnHaVy6dI/hTRhvi17MyrY2R\nuAvqyEVDGxb5Ld4w0bgZOYL9oNPRhBw0vvB6lEXyhtxFJ4s9KOg3gZLpSvSLMETc\nEL6WMy8Ka7Kk627IgPmnfP9dEX645d815fHKzsECgYA88SXKKOdf5NcoU+fqlY2e\n+o/lDuNoz9K23PcqGQ4GC/L3dpbQUYG/xcDOZvdEp/+asz6EatWy+xHQJ4rHhVZX\nA160aloKhW2/JeioOkAMYDfLM+bPCOGC6Er+juKjJ7CFqc4C76knemRTsPce2lyC\nZgYNmq5hOIb7s4VX/6G5Sw==\n-----END PRIVATE KEY-----\n',
    'client_email': 'firebase-adminsdk-rx8xk@mahaplatform.iam.gserviceaccount.com',
    'client_id': '110894211381539572439',
    'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
    'token_uri': 'https://oauth2.googleapis.com/token',
    'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
    'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rx8xk%40mahaplatform.iam.gserviceaccount.com'
  })
})

export const messaging = admin.messaging()
