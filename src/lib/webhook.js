const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1482837165959282798/0JjdvJQP0a7cYZUuj6wR4VtYsTJW4AISjIPL3CPXq8QSrP4_BhBf1i7mSke1FN90_DEo';

function buildPayload(eventName, data = {}) {
  const now = new Date();
  return {
    content: [
      'Breath Webhook Event',
      `event: ${eventName}`,
      `time: ${now.toISOString()}`,
      `path: ${window.location.pathname}`,
      `data: ${JSON.stringify(data)}`
    ].join('\n')
  };
}

export function sendWebhook(eventName, data = {}) {
  try {
    const payload = buildPayload(eventName, data);

    // Use keepalive so events can still be sent while navigation happens.
    fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {
      // Fire-and-forget: ignore network errors to avoid breaking user flow.
    });
  } catch {
    // Never block UI when webhook payload creation fails.
  }
}
