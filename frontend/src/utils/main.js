// Example 1: No extra options passed
const options = { method: 'POST', body: { id: 1 } };
const { method, body, headers, ...customConfig } = options;

console.log(customConfig, "fds");
// Output: {} (Empty object, NOT undefined)
