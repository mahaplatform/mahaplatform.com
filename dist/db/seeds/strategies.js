'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tableName: 'maha_strategies',
  records: [{
    team_id: 1,
    name: 'local'
  }, {
    team_id: 1,
    name: 'cornell',
    config: {
      entryPoint: 'https://shibidp-test.cit.cornell.edu/idp/profile/SAML2/Redirect/SSO',
      issuer: 'https://shibidp-test.cit.cornell.edu/idp/shibboleth',
      cert: 'MIIDXDCCAkSgAwIBAgIVAMKCR8IGXIOzO/yLt6e4sd7OMLgEMA0GCSqGSIb3DQEB BQUAMCcxJTAjBgNVBAMTHHNoaWJpZHAtdGVzdC5jaXQuY29ybmVsbC5lZHUwHhcN MTIwNjA3MTg0NjIyWhcNMzIwNjA3MTg0NjIyWjAnMSUwIwYDVQQDExxzaGliaWRw LXRlc3QuY2l0LmNvcm5lbGwuZWR1MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB CgKCAQEAkhlf9EP399mqnBtGmPG9Vqu79Af2NZhhsT+LTMA1uhPZYv4RX/E4VD+I qce/EUP1ndPkGEwBnhrRT2ZegDpCmgo+EcED8cAh9AbwFTTitmBjxvErtJnS0ZBf MCLDcgOV1zM6bT5fF9SAIm0ZVSaeyQbNDwVDdwsBQHjAdg5vLd5VeYH9MI6enzdg BtPNSrEt3qZtCWl7ev8YQlWF3vZ+EoyDrWPZSOWzgR31QBs7mz13ABSveIri68Fg Nth9ylgFS7VNUlAp6xx6BRnMgL1QzVMZ5F4PbSRDp3UBoS6PMHd+WFenJWPPh6Sh MyrInrJ4QAPfKC77tJW+GUXl4T4DqQIDAQABo38wfTBcBgNVHREEVTBTghxzaGli aWRwLXRlc3QuY2l0LmNvcm5lbGwuZWR1hjNodHRwczovL3NoaWJpZHAtdGVzdC5j aXQuY29ybmVsbC5lZHUvaWRwL3NoaWJib2xldGgwHQYDVR0OBBYEFF9RADnmBsO5 0hD8T+MUFqIgWAOxMA0GCSqGSIb3DQEBBQUAA4IBAQBqYpfdK4XAYE56sYmq/vUK OSBcbO2Uy3R7oTGrDKxrZI7xC1jchaaTW6BXtg6wzTSn8Jo2M0gvQrWyxZgQDrXG aL2TaPf5WjOWt/SsuJ+IShofS6ZWLkPCnrR0Ag9PwU58szw2jjUE4eJyv/dLDzhD HJ0EGastgSzRh1r3v2w8BYz1RHvjwESPB2HTgV1iuHwaIjaJxN39XyS6ZQzBj6sZ 6Lem1R39zXmEvtVfCk9qgSKnbYulrrkIBzxllB34TUTKFs+Nz1j/sg2gj6Q5u9uW 6mSm66mqn2E53r2CNHPTzWGwom5Mi9Z/DtOb2L/5jjxhFvCKxnEbIWm7XIe8qtqo'
    }
  }, {
    team_id: 1,
    name: 'google',
    config: {
      clientID: '145859176057-sainn11sroqfsf3eg8vl5qqregnf4agm.apps.googleusercontent.com',
      clientSecret: 'VuN69Tbo5uyF08zQZ3zvOE6B',
      callbackURL: 'http://localhost:8080/admin/signin/google'
    }
  }]
};