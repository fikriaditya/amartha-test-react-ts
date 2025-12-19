// import '../styles/main.scss'

function Styleguide() {

  return (
    <>
      <div className="flex-content">
        <section className="styleguide">
          <div className="section-title">
            Colors
          </div>
          <div className="section-content">
            <h3>Primary Colors</h3>
            <div className="color-palette">
              <div className="color-swatch" style={{ backgroundColor: '#7f5fa3' }}>
                <span className="color-label">Primary</span>
                <span className="color-hex">#7f5fa3</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#8a77d8' }}>
                <span className="color-label">Primary Light 1</span>
                <span className="color-hex">#8a77d8</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#8a54cf' }}>
                <span className="color-label">Primary Light 2</span>
                <span className="color-hex">#8a54cf</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#a989c7' }}>
                <span className="color-label">Primary Light 3</span>
                <span className="color-hex">#a989c7</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#caaae3' }}>
                <span className="color-label">Primary Light 4</span>
                <span className="color-hex">#caaae3</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#650f79' }}>
                <span className="color-label">Primary Dark 1</span>
                <span className="color-hex">#650f79</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#420956' }}>
                <span className="color-label">Primary Dark 2</span>
                <span className="color-hex">#420956</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#63297a' }}>
                <span className="color-label">Primary Dark 3</span>
                <span className="color-hex">#63297a</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#343872' }}>
                <span className="color-label">Primary Blue</span>
                <span className="color-hex">#343872</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#f6f6fe', color: '#828282' }}>
                <span className="color-label">Primary White</span>
                <span className="color-hex">#f6f6fe</span>
              </div>
            </div>
            <h3>Secondary Colors</h3>
            <div className="color-palette">
              <div className="color-swatch" style={{ backgroundColor: '#6b75ca' }}>
                <span className="color-label">Blue</span>
                <span className="color-hex">#6b75ca</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#fbd22f' }}>
                <span className="color-label">Yellow</span>
                <span className="color-hex">#fbd22f</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#e38619' }}>
                <span className="color-label">Orange</span>
                <span className="color-hex">#e38619</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#27AE60' }}>
                <span className="color-label">Green</span>
                <span className="color-hex">#27AE60</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#f72495' }}>
                <span className="color-label">Red</span>
                <span className="color-hex">#f72495</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#fefbe7', color: '#828282'}}>
                <span className="color-label">Cream</span>
                <span className="color-hex">#fefbe7</span>
              </div>
            </div>
            <h3>Shade Colors</h3>
            <div className="color-palette">
              <div className="color-swatch" style={{ backgroundColor: '#333333' }}>
                <span className="color-label">Dark 1</span>
                <span className="color-hex">#333333</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#4a4a4a' }}>
                <span className="color-label">Dark 2</span>
                <span className="color-hex">#4a4a4a</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#828282' }}>
                <span className="color-label">Dark 3</span>
                <span className="color-hex">#828282</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#bdbdbd' }}>
                <span className="color-label">Light 1</span>
                <span className="color-hex">#bdbdbd</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#e0e0e0', color: '#828282' }}>
                <span className="color-label">Light 2</span>
                <span className="color-hex">#e0e0e0</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#f2f2f2', color: '#828282' }}>
                <span className="color-label">Light 3</span>
                <span className="color-hex">#f2f2f2</span>
              </div>
            </div>
          </div>
        </section>
        <section className="styleguide">
          <div className="section-title">
            Typography
          </div>
          <h1>Header 1</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>
          <h5>Header 5</h5>
          <h6>Header 6</h6>
          <p>
            This is a paragraph demonstrating the default text style in the application. I
            t should provide a clear and readable font for users.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="">This is an inline link</a>
          <p className="text-small">lorem ipsum dolor sit amet consecteur</p>
          <p className="text-info">This is an info text.</p>
          <p className="text-success">This is a success text.</p>
          <p className="text-warning">This is a warning text.</p>
          <p className="text-danger">This is an error text.</p>
        </section>
        <section className="styleguide">
          <div className="section-title">
            Buttons
          </div>
          <div className="button-group">
            <button className="button">
              Button
            </button>
            <button className="button">
              <span className="button__icon plus-icon"></span>
              Button
            </button>
            <button className="button button--secondary">Button</button>
            <button className="button button--secondary">
              <span className="button__icon plus-icon"></span>
              Button
            </button>
          </div>
          <div className="button-group">
            <button className="button disabled" disabled>Button</button>
            <button className="button disabled" disabled>
              <span className="button__icon plus-icon"></span>
              Button
            </button>
            <button className="button button--secondary disabled" disabled>Button</button>
            <button className="button button--secondary disabled" disabled>
              <span className="button__icon plus-icon"></span>
              Button
            </button>
          </div>
        </section>
        <section className="styleguide">
          <div className="section-title">
            Forms Input
          </div>
          <div className="section-content">
            <div className="x-form__field">                   
              <input type="text" className="x-form__input" placeholder="Text Input" required/>
            </div>
            <div className="x-form__field">   
              <input type="text" className="x-form__input x-form__input--error" placeholder="Input with Error" required/>
            </div>
            <div className="x-form__field">
              <input type="text" className="x-form__input x-form__input--disabled" placeholder="Disabled Input" disabled />
            </div>
            <div className="x-form__field">
              <input type="search" className="x-form__input" placeholder="Search Input"/>
            </div>
            <div className="x-form__field">
              <select className="x-form__input" required>
                <option>Select Option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="x-form__field">
              <textarea id="user_message" className="x-form__input" name="message" rows={4} cols={50}>
                Default text can go here.
              </textarea>
            </div>
          </div>
        </section>
        <section className="styleguide">
          <div className="section-title">
            Table
          </div>
          <div className="table-container">
            <div className="table-header">
              <h2>Project Overview</h2>
              <p>Real-time updates of current development sprints</p>
            </div>
            <table className="x-table">
              <thead>
                <tr>
                  <th className="sortable">Name <span className="sort-icon">↕</span></th>
                  <th className="sortable">Department <span className="sort-icon">↕</span></th>
                  <th className="sortable">Role <span className="sort-icon">↕</span></th>
                  <th className="sortable">Location <span className="sort-icon">↕</span></th>
                  <th>Photo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Renita Martadinata</td>
                  <td>Lending</td>
                  <td>Ops</td>
                  <td>Jakarta</td>
                  <td>Ops</td>
                </tr>
                <tr>
                  <td>Rachel Amanda</td>
                  <td>Funding</td>
                  <td>Admin</td>
                  <td>Surabaya</td>
                  <td>Funding</td>
                </tr>
                <tr>
                  <td>Baskara Putra</td>
                  <td>Operation</td>
                  <td>Finance</td>
                  <td>Depok</td>
                  <td>Row 3, Cell 5</td>
                </tr>
                <tr>
                  <td>Michael Tjandra</td>
                  <td>Engineering</td>
                  <td>Engineer</td>
                  <td>Jakarta</td>
                  <td>Jakarta</td>
                </tr>
                <tr>
                  <td>Agus Salim</td>
                  <td>Funding</td>
                  <td>Ops</td>
                  <td>Depok</td>
                  <td>Row 5, Cell 5</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="pagination-container">
              <button className="pagination-button" disabled>First</button>
              <button className="pagination-button" disabled>Previous</button>
              <span className="pagination-info">Page 1 of 10</span>
              <button className="pagination-button">Next</button>
              <button className="pagination-button" disabled>Last</button>
          </div> */}
          <div className="pagination-container">
            <div className="page-size-selector">
              <label htmlFor="pageSize">Rows per page:</label>
              <select id="pageSize">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="pagination-controls">
              <div className="page-jump">
                <span>Page</span>
                <input type="number" id="currentPageInput" value="1" min="1" max="50"/>
                <span>of 50</span>
              </div>

              <div className="pagination-buttons">
                <button className="btn-nav" title="Previous Page">&laquo;</button>
                <button className="btn-nav" title="Next Page">&raquo;</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Styleguide
