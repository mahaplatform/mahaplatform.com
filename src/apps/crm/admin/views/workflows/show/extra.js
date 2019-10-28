<div className="crm-report-chart">
  <Chart { ...this._getChart() } />
<div>
<div className="crm-report-table">
  <table className="ui table">
    <tbody>
      <tr>
        <td>
          <div className="key red" />
          Enrolled
        </td>
        <td className="right aligned">
          <div className="link">100</div>
        </td>
      </tr>
      <tr>
        <td>
          <div className="key orange" />
          Active
        </td>
        <td className="right aligned">
          { this._getStat(31, 100) }
        </td>
      </tr>
      <tr>
        <td>
          <div className="key yellow" />
          Lost
        </td>
        <td className="right aligned">
          { this._getStat(20, 100) }
        </td>
      </tr>
      <tr>
        <td>
          <div className="key green" />
          Completed
        </td>
        <td className="right aligned">
          { this._getStat(21, 100) }
        </td>
      </tr>
      <tr>
        <td>
          <div className="key blue" />
          Converted
        </td>
        <td className="right aligned">
          { this._getStat(28, 100) }
        </td>
      </tr>
    </tbody>
  </table>
<div>
