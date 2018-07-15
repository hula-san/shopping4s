class ProductsController < ApplicationController
  before_action :find_product, only: %i(show)

  attr_reader :product

  def index
    @products = Product.all
  end

  def show

    respond_to do |format|
      format.html
      format.json { render :json => @product }
    end
  end

  private

  def find_product
    @product = Product.find_by id: params[:id]

    return if product
    flash[:danger] = t "layouts.application.error"
    redirect_to rool_url
  end
end
