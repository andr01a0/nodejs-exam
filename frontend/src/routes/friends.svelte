<script>
  import { 
    InteractiveTabHead, TabContent,
    TableSearch, TableHead, TableHeadCell, TableBody, 
    TableBodyRow, TableBodyCell, Table
  } from 'flowbite-svelte'
	let tab1 = { name: 'My Friends', id: 1 }
	let tab2 = { name: 'Requests', id: 2 }
  let tab3 = { name: 'Search', id: 3 }
	let tabhead = [tab1, tab2, tab3]
  let searchTerm = ''
	let items = [
		{ id: 1, maker: 'Toyota', type: 'ABC', make: 2017 },
		{ id: 2, maker: 'Ford', type: 'CDE', make: 2018 },
		{ id: 3, maker: 'Volvo', type: 'FGH', make: 2019 },
		{ id: 4, maker: 'Saab', type: 'IJK', make: 2020 }
	]
	$: filteredItems = items.filter(
		(item) => item.maker.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	)
</script>

<diV class="flex-wrap w-3/4">
  <InteractiveTabHead tabs={tabhead}>
    <TabContent tab={tab1}>
      <Table hoverable={true}>
        <TableHead>
          <TableHeadCell>Product name</TableHeadCell>
          <TableHeadCell>Color</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>
            <span class="sr-only"> Edit </span>
          </TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
        <TableBodyRow>
            <TableBodyCell>
              Apple MacBook Pro 17"
            </TableBodyCell>
            <TableBodyCell>Sliver</TableBodyCell>
            <TableBodyCell>Laptop</TableBodyCell>
            <TableBodyCell>$2999</TableBodyCell>
            <TableBodyCell>
              <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
            </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell>
              Microsoft Surface Pro
            </TableBodyCell>
            <TableBodyCell>White</TableBodyCell>
            <TableBodyCell>Laptop PC</TableBodyCell>
            <TableBodyCell>$1999</TableBodyCell>
            <TableBodyCell>
              <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
            </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell>
              Magic Mouse 2
            </TableBodyCell>
            <TableBodyCell>Black</TableBodyCell>
            <TableBodyCell>Accessories</TableBodyCell>
            <TableBodyCell>$99</TableBodyCell>
            <TableBodyCell>
              <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
            </TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </TabContent>
    <TabContent tab={tab2}>
      <Table hoverable={true}>
        <TableHead>
          <TableHeadCell>Product name</TableHeadCell>
          <TableHeadCell>Color</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>
            <span class="sr-only"> Edit </span>
          </TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
        <TableBodyRow>
            <TableBodyCell>
              Apple MacBook Pro 17"
            </TableBodyCell>
            <TableBodyCell>Sliver</TableBodyCell>
            <TableBodyCell>Laptop</TableBodyCell>
            <TableBodyCell>$2999</TableBodyCell>
            <TableBodyCell>
              <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
            </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell>
              Microsoft Surface Pro
            </TableBodyCell>
            <TableBodyCell>White</TableBodyCell>
            <TableBodyCell>Laptop PC</TableBodyCell>
            <TableBodyCell>$1999</TableBodyCell>
            <TableBodyCell>
              <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
            </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCell>
              Magic Mouse 2
            </TableBodyCell>
            <TableBodyCell>Black</TableBodyCell>
            <TableBodyCell>Accessories</TableBodyCell>
            <TableBodyCell>$99</TableBodyCell>
            <TableBodyCell>
              <a href="/tables" class="font-medium text-blue-600 hover:underline dark:text-blue-500"> Edit </a>
            </TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </TabContent>
    <TabContent tab={tab3}>
      <TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
        <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Maker</TableHeadCell>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell>Make</TableHeadCell>
        </TableHead>
        <TableBody class="divide-y">
          {#each filteredItems as item}
            <TableBodyRow>
              <TableBodyCell>{item.id}</TableBodyCell>
              <TableBodyCell>{item.maker}</TableBodyCell>
              <TableBodyCell>{item.type}</TableBodyCell>
              <TableBodyCell>{item.make}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
    </TabContent>
  </InteractiveTabHead>
</diV>