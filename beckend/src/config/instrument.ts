import * as Sentry from "@sentry/node";
import {nodeProfilingIntegration} from '@sentry/profiling-node'

Sentry.init({
  dsn: "https://8ea67a11465303dbe1787296df854bb4@o4508975528607744.ingest.us.sentry.io/4508975538176000",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongoIntegration()
  ]
});

