<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
		if(error.message === undefined){
			if (status === 404){
				error = {
					statusCode: status,
					message: "Page not found"
				}
			} else {
				error = {
					statusCode: status,
					message: "Something went wrong"
				}
			}
		}
    return {
      props: {
        title: `${status}: ${error.message}`
      }
    };
  }
</script>

<script>
  export let title;
</script>

<h1>{title}</h1>