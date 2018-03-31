<Select
value={10}
onChange={this.handleChange}
inputProps={{
  name: 'age',
  id: 'age-simple',
}}
>
<MenuItem value="">
  <em>None</em>
</MenuItem>
<MenuItem value={10}>Ten</MenuItem>
<MenuItem value={20}>Twenty</MenuItem>
<MenuItem value={30}>Thirty</MenuItem>
</Select>