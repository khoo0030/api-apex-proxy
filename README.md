## Table of Contents
- [api-apex-proxy](#api-apex-proxy)
- [Project Specifics](#project-specifics)
    - [Environments](#environments)

## api-apex-proxy
A sample NodeJS app to proxy http requests to APEX. Supports L1 and L2 authentication.

## Project Specifics

### Environments
Node | config.js | What is it?
------------ | ------------- | -------------
NODE_ENV | `app.env` | Node environment. Default 'development'
PORT | `app.port` | Running port. Default 3000
LOGGING_LEVEL | `app.logging.level` | Logging level. Default 'debug'
TARGET | `proxy.target` | Proxy target URL.
APEX_INTERNET_POLICY | `apex.internet.policy` | Apex internet app policy. 'L0', 'L1' or 'L2'
APEX_INTERNET_BASE_URL | `apex.internet.baseURL` | Apex internet api base URL.
APEX_INTERNET_SIGNING_APP_ID | `apex.internet.signing.appId` | Apex internet app ID.
APEX_INTERNET_SIGNING_SECRET | `apex.internet.signing.secret` | Apex internet app L1 secret.
APEX_INTERNET_SIGNING_KEY_FILE_PATH | `apex.internet.signing.keyFile` | Apex internet app L2 key file.
APEX_INTRANET_POLICY | `apex.intranet.policy` | Apex intranet app policy. 'L0', 'L1' or 'L2'
APEX_INTRANET_BASE_URL | `apex.intranet.baseURL` | Apex intranet api base URL.
APEX_INTRANET_SIGNING_APP_ID | `apex.intranet.signing.appId` | Apex intranet app ID.
APEX_INTRANET_SIGNING_SECRET | `apex.intranet.signing.secret` | Apex intranet app L1 secret.
APEX_INTRANET_SIGNING_KEY_FILE_PATH | `apex.intranet.signing.keyFile` | Apex intranet app L2 key file.
