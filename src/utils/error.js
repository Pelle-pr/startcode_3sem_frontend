export default function PrintError(promise, setError) {
  promise.fullError.then(function (status) {
    setError(`${status.message}`);
  });
}
