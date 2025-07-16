require 'httparty'
require 'json'

FIREBASE_DB_URL = 'https://kith-partner-app-staging-default-rtdb.firebaseio.com/'
now = Time.now.to_i * 1000  # Firebase expects milliseconds

payload = {
  lines: [
    {
      "sku": "SKU_123",
      "quantity": 3,
    },
    {
      "sku": "SKU_123",
      "quantity": 3,
    },
  ],
  receiptNumber: "RECEIPT_#{now}",
  createdAt: now
}

response = HTTParty.put(
  "#{FIREBASE_DB_URL}/partners/UUID6/orders/ORDER_#{now}.json?auth=gOTUKx7BiCBOOxwCcRzGRVrZ06S4jDRPrfhIF3FS",
  body: payload.to_json,
  headers: { 'Content-Type' => 'application/json' }
)

puts response.body
